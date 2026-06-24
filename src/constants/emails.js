// Email notifications templates - African Shipping Management (ASM)

const ADMIN_TEMPLATE = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Nouveau contact - African Shipping Management</title>
</head>
<body style="background-color:#f5f7fa;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">

  <table align="center" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="max-width:600px;background:#fff;border:1px solid #e0e6ef;border-radius:8px;
           box-shadow:0 4px 12px rgba(1, 40, 99, 0.1);margin:30px auto;padding:0;">
    <tbody>
      <!-- Header avec couleur ASM -->
      <tr>
        <td style="background: linear-gradient(135deg, #012863 0%, #00a650 100%);padding:25px 20px;border-radius:8px 8px 0 0;">
          <a href="https://africansm-rdc.com" target="_blank" style="text-decoration:none;">
            <img src="https://africansm-rdc.com/assets/img/logo/logo.png" alt="African Shipping Management" 
              width="180" style="display:block;margin:0 auto;filter: brightness(0) invert(1);" />
          </a>
          <p style="font-size:12px;margin:12px 0 0 0;color:#ffffff;font-weight:600;text-transform:uppercase;text-align:center;letter-spacing:1px;">
            Notification · Nouveau Contact
          </p>
        </td>
      </tr>

      <!-- Corps du message -->
      <tr>
        <td style="padding:30px 25px;">
          <h1 style="font-size:20px;font-weight:700;color:#012863;margin:0 0 25px 0;text-align:center;">
            Nouvelle demande de contact
          </h1>
          
          <div style="background:#f8fafc;border-left:4px solid #00a650;padding:20px;border-radius:4px;margin-bottom:25px;">
            <p style="font-size:15px;color:#012863;margin:0 0 15px 0;font-weight:600;">Informations du contact :</p>
            
            <table cellspacing="0" cellpadding="0" style="width:100%;">
              <tr>
                <td style="width:40%;padding:8px 0;color:#4a5568;font-size:14px;"><strong>Nom & Prénom :</strong></td>
                <td style="padding:8px 0;color:#012863;font-size:14px;font-weight:600;">{{customer_name}}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#4a5568;font-size:14px;"><strong>Email :</strong></td>
                <td style="padding:8px 0;color:#012863;font-size:14px;">{{customer_email}}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#4a5568;font-size:14px;"><strong>Téléphone :</strong></td>
                <td style="padding:8px 0;color:#012863;font-size:14px;">{{customer_phone}}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#4a5568;font-size:14px;"><strong>Secteur d'intérêt :</strong></td>
                <td style="padding:8px 0;color:#012863;font-size:14px;">{{customer_field}}</td>
              </tr>
            </table>
          </div>

          <div style="background:#f8fafc;border-left:4px solid #012863;padding:20px;border-radius:4px;">
            <p style="font-size:15px;color:#012863;margin:0 0 10px 0;font-weight:600;">Message :</p>
            <div style="background:#fff;border:1px solid #e2e8f0;padding:15px;border-radius:4px;font-size:14px;color:#2d3748;line-height:1.6;">
              {{customer_message}}
            </div>
          </div>

          <p style="font-size:13px;color:#718096;margin:25px 0 0 0;text-align:center;">
            📍 <em>Ce message a été envoyé via le formulaire de contact du site ASM</em>
          </p>
        </td>
      </tr>

      <!-- Bouton d'action -->
      <tr>
        <td align="center" style="padding:0 25px 30px 25px;">
          <a href="https://api.africansm-rdc.com/admin" target="_blank"
            style="background:#012863;color:#fff;padding:14px 32px;font-size:15px;
                   text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;
                   border:2px solid #012863;transition:all 0.3s ease;">
            Accéder au tableau de bord
          </a>
          <p style="font-size:12px;color:#718096;margin:15px 0 0 0;">
            Date de réception : {{date}}
          </p>
        </td>
      </tr>

      <!-- Footer léger -->
      <tr>
        <td style="background:#f8fafc;padding:20px;border-top:1px solid #e2e8f0;border-radius:0 0 8px 8px;">
          <p style="font-size:12px;color:#718096;text-align:center;margin:0;line-height:1.5;">
            <strong>African Shipping Management (ASM)</strong><br/>
            Solutions numériques pour la transformation du transport multimodal en RDC<br/>
            <a href="mailto:support@africansm-rdc.com" style="color:#00a650;text-decoration:none;">support@africansm-rdc.com</a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>

</body>
</html>
`;

const VISITOR_TEMPLATE = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Confirmation - African Shipping Management</title>
</head>
<body style="background-color:#f5f7fa;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">

  <table align="center" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="max-width:600px;background:#fff;border:1px solid #e0e6ef;border-radius:8px;
           box-shadow:0 4px 12px rgba(1, 40, 99, 0.1);margin:30px auto;padding:0;">
    <tbody>
      <!-- Header avec couleur ASM -->
      <tr>
        <td style="background: linear-gradient(135deg, #012863 0%, #00a650 100%);padding:25px 20px;border-radius:8px 8px 0 0;">
          <a href="https://africansm-rdc.com" target="_blank" style="text-decoration:none;">
            <img src="https://africansm-rdc.com/assets/img/logo/logo.png" alt="African Shipping Management" 
              width="180" style="display:block;margin:0 auto;filter: brightness(0) invert(1);" />
          </a>
        </td>
      </tr>

      <!-- Message de confirmation -->
      <tr>
        <td style="padding:40px 25px;text-align:center;">
          <div style="background:#f0f9ff;border-radius:50%;width:80px;height:80px;margin:0 auto 25px auto;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:36px;color:#00a650;">✓</span>
          </div>
          
          <h1 style="font-size:24px;font-weight:700;color:#012863;margin:0 0 20px 0;">
            Merci {{customer_name}} !
          </h1>
          
          <div style="max-width:480px;margin:0 auto;">
            <p style="font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 20px 0;">
              Nous avons bien reçu votre message et vous remercions d'avoir contacté 
              <strong style="color:#012863;">African Shipping Management</strong>.
            </p>
            
            <p style="font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 25px 0;">
              Notre équipe spécialisée dans les solutions numériques pour le transport multimodal 
              examinera votre demande et vous répondra dans les plus brefs délais.
            </p>

          
          </div>
        </td>
      </tr>

      <!-- Prochaines étapes -->
      <tr>
        <td style="padding:0 25px 30px 25px;">
          <div style="background:#012863;color:#fff;padding:25px;border-radius:8px;text-align:center;">
            <h2 style="font-size:18px;margin:0 0 15px 0;color:#fff;">Prochaines étapes</h2>
            <div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;">
              <div style="background:rgba(255,255,255,0.1);padding:12px 15px;border-radius:6px;min-width:140px;">
                <div style="font-size:24px;margin-bottom:8px;">📞</div>
                <div style="font-size:12px;font-weight:600;">Contact sous 24h</div>
              </div>
              <div style="background:rgba(255,255,255,0.1);padding:12px 15px;border-radius:6px;min-width:140px;">
                <div style="font-size:24px;margin-bottom:8px;">📊</div>
                <div style="font-size:12px;font-weight:600;">Analyse de vos besoins</div>
              </div>
              <div style="background:rgba(255,255,255,0.1);padding:12px 15px;border-radius:6px;min-width:140px;">
                <div style="font-size:24px;margin-bottom:8px;">💡</div>
                <div style="font-size:12px;font-weight:600;">Proposition sur mesure</div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <!-- Bouton retour site -->
      <tr>
        <td align="center" style="padding:0 25px 40px 25px;">
          <a href="https://africansm-rdc.com" target="_blank"
            style="background:#00a650;color:#fff;padding:14px 32px;font-size:15px;
                   text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;
                   border:2px solid #00a650;transition:all 0.3s ease;">
            Découvrir nos solutions
          </a>
          <p style="font-size:13px;color:#718096;margin:20px 0 0 0;">
            Vous recevrez une réponse dans un bref délai.
          </p>
        </td>
      </tr>

      <!-- Footer complet -->
      <tr>
        <td style="background:#f8fafc;padding:30px 25px;border-top:1px solid #e2e8f0;border-radius:0 0 8px 8px;">
          <div style="max-width:400px;margin:0 auto;text-align:center;">
            <p style="font-size:14px;color:#012863;font-weight:600;margin:0 0 15px 0;">
              African Shipping Management (ASM)
            </p>
            <p style="font-size:12px;color:#718096;margin:0 0 10px 0;line-height:1.5;">
              <strong>Siège :</strong> Immeuble Kiyo Ya Sita, Boulevard du 30 Juin<br/>
              9ème Niveau, Appartement 902 & 903, Kinshasa - Gombe
            </p>
            <p style="font-size:12px;color:#718096;margin:0 0 10px 0;line-height:1.5;">
              <strong>Présence nationale :</strong> Kinshasa, Lubumbashi, Kolwezi, Kalemie,<br/>
              Kisangani, Matadi, Bukavu, Goma, Boma
            </p>
            <p style="font-size:12px;color:#718096;margin:0 0 15px 0;line-height:1.5;">
              📧 <a href="mailto:support@africansm-rdc.com" style="color:#00a650;text-decoration:none;">support@africansm-rdc.com</a> | 
              📞 <strong>+243 991 450 541</strong>
            </p>
            <p style="font-size:11px;color:#a0aec0;margin:0;border-top:1px solid #e2e8f0;padding-top:15px;">
              © {{year}} African Shipping Management (ASM)<br/>
              Digitalisation du secteur de transport multimodal en RDC
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

</body>
</html>
`;

export { ADMIN_TEMPLATE, VISITOR_TEMPLATE };