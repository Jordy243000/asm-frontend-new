const BASE_URL = "https://africansm-rdc.com";

function generateSiteMap(services, products, blogs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Pages -->
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
     
     
      
      <!-- Services -->
      <url>
        <loc>${BASE_URL}/services</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
     
      
      <!-- Products -->
      <url>
        <loc>${BASE_URL}/products</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
     
      
      <!-- Blog -->
      <url>
        <loc>${BASE_URL}/blog</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
     
      
      <!-- Other Pages -->
      <url>
        <loc>${BASE_URL}/about</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
     
      <url>
        <loc>${BASE_URL}/contact</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
     
      <url>
        <loc>${BASE_URL}/carriere/offres</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>

      <url>
        <loc>${BASE_URL}/carriere/appels-doffres</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>

      <url>
        <loc>${BASE_URL}/carriere/candidature</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
     
      <url>
        <loc>${BASE_URL}/equipe</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
      
      
      <!-- Dynamic Content -->
      ${services?.data
        ?.map(
          ({ id, attributes }) => `
        <url>
          <loc>${BASE_URL}/services/${id}</loc>
          <lastmod>${
            attributes?.updatedAt?.split("T")[0] ||
            new Date().toISOString().split("T")[0]
          }</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
       
      `
        )
        .join("")}
      
      ${products?.data
        ?.map(
          ({ id, attributes }) => `
        <url>
          <loc>${BASE_URL}/products/${id}</loc>
          <lastmod>${
            attributes?.updatedAt?.split("T")[0] ||
            new Date().toISOString().split("T")[0]
          }</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
       
      `
        )
        .join("")}
      
      ${blogs?.data
        ?.map(
          ({ id, attributes }) => `
        <url>
          <loc>${BASE_URL}/blog/${id}</loc>
          <lastmod>${
            attributes?.updatedAt?.split("T")[0] ||
            new Date().toISOString().split("T")[0]
          }</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
        
      `
        )
        .join("")}
    </urlset>
  `;
}

export async function GET() {
  const servicesRes = await fetch(
    "https://api.africansm-rdc.com/api/services?populate=*"
  );
  const productsRes = await fetch(
    "https://api.africansm-rdc.com/api/products?populate=*"
  );
  const blogRes = await fetch(
    "https://api.africansm-rdc.com/api/blogs?populate=*"
  );

  const servicesData = await servicesRes.json();
  const productsData = await productsRes.json();
  const blogData = await blogRes.json();

  const sitemap = generateSiteMap(servicesData, productsData, blogData);

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
