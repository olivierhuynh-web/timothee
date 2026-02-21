// Service API pour communiquer avec Strapi

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Récupère tous les projets depuis Strapi
 */
export async function getProjects() {
  try {
    // Strapi v5 nécessite une syntaxe explicite pour les composants imbriqués
    const populateQuery = 'populate[images][populate][0]=file&populate[images][populate][1]=captions';
    const response = await fetch(`${STRAPI_URL}/api/projects?${populateQuery}`, {
      cache: 'no-store', // Pour toujours avoir les données fraîches en dev
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();

    // Transformer les données Strapi au format attendu par l'app
    return transformProjects(data.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return [];
  }
}

/**
 * Récupère un projet spécifique par son ID
 */
export async function getProject(id) {
  try {
    const populateQuery = 'populate[images][populate][0]=file&populate[images][populate][1]=captions';
    const response = await fetch(`${STRAPI_URL}/api/projects/${id}?${populateQuery}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return transformProject(data.data);
  } catch (error) {
    console.error(`Erreur lors de la récupération du projet ${id}:`, error);
    return null;
  }
}

/**
 * Transforme les données Strapi au format attendu par l'application
 */
function transformProjects(projects) {
  if (!projects || !Array.isArray(projects)) return [];

  return projects.map(project => transformProject(project));
}

/**
 * Transforme un projet Strapi au format attendu
 */
function transformProject(project) {
  if (!project) return null;

  const { id, documentId } = project;
  const attributes = project.attributes || project;

  return {
    id: (id || documentId || '').toString(),
    name: attributes.title || attributes.name || '',
    description: attributes.description || '',
    pictures: transformImages(attributes.images),
  };
}

/**
 * Transforme les images du format Strapi
 */
function transformImages(images) {
  if (!images || !Array.isArray(images)) return [];

  return images.map((image, index) => {
    // Le fichier peut être un tableau ou un objet
    const fileData = Array.isArray(image.file) ? image.file[0] : image.file;

    const imageData = {
      id: (index + 1).toString(),
      url: getImageUrl(fileData),
      heading: image.title || image.Title || '',
    };

    // Gestion des captions - toujours retourner un tableau
    if (image.captions && image.captions.length > 0) {
      imageData.captions = image.captions.map(caption => caption.text || caption.Text || '');
    } else {
      imageData.captions = [];
    }

    return imageData;
  });
}

/**
 * Récupère l'URL complète d'une image
 */
function getImageUrl(fileData) {
  if (!fileData) return '';

  // Dans Strapi v5, l'URL peut être directement dans fileData.url
  const url = fileData.url || (fileData.data && fileData.data.attributes && fileData.data.attributes.url);

  if (!url) return '';

  // Si l'URL est relative, ajouter le domaine Strapi
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`;
  }

  return url;
}

/**
 * Récupère tous les stickers depuis Strapi
 */
export async function getStickers() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/stickers?populate=image`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Format de données invalide');
    }

    // Extraire les URLs des images
    return data.data.map(sticker => {
      const attributes = sticker.attributes || sticker;
      const imageData = attributes.image;

      // Gérer les différentes structures possibles de Strapi v5
      let imageUrl = '';
      if (imageData) {
        if (imageData.url) {
          imageUrl = imageData.url;
        } else if (imageData.data?.attributes?.url) {
          imageUrl = imageData.data.attributes.url;
        }
      }

      // Si l'URL est relative, ajouter le domaine Strapi
      if (imageUrl && imageUrl.startsWith('/')) {
        return `${STRAPI_URL}${imageUrl}`;
      }

      return imageUrl;
    }).filter(url => url); // Filtrer les URLs vides
  } catch (error) {
    console.error('Erreur lors de la récupération des stickers:', error);
    // Fallback vers les stickers statiques
    return Array.from({ length: 27 }, (_, i) => `/stickers/${i + 1}.png`);
  }
}
