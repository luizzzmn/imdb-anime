async function getAnimeBanner(id = 0) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

    const json = await response.json();
    const pictures = json.data || [];

    // Tenta encontrar uma imagem que pareça banner (largura maior que altura)
    const banner = pictures.find(pic => pic.jpg.image_url && pic.jpg.image_url.includes('.jpg'));

    return banner?.jpg?.large_image_url || null;
  } catch (error) {
    console.error("Erro ao buscar imagem banner do anime:", error);
    return null;
  }
}

export { getAnimeBanner };
