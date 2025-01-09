import nodemailer from "nodemailer";
import { UserNODEMAILER, PassNODEMAILER, ToEmailNODEMAILER } from "../config.js";

export const sendEmail = async (req, res) => {
  try {
    const { nombre, apellido, correo, asunto, comentarios } = req.body;

    if (!nombre || !apellido || !correo || !asunto || !comentarios) {
      return res.status(400).send("Falta enviar datos obligatorios");
    }

    // Configuración de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: UserNODEMAILER,
        pass: PassNODEMAILER,
      },
    });

    // Contenido del correo
    const mailOptions = {
      from: correo,
      to: ToEmailNODEMAILER,
      subject: `${asunto} - Mensaje del formulario de contacto`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 16px; background-color: #f9f9f9;">
          <h2 style="color: #8b0000; text-align: center; margin-bottom: 24px;">Mensaje de Contacto</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Hola <strong>Génesis de Herencia</strong>, un usuario ha enviado un mensaje desde el formulario de contacto de su sitio web.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
          <h3 style="color: #8b0000;">Detalles del mensaje</h3>
          <ul style="font-size: 15px; line-height: 1.5; list-style: none; padding: 0;">
            <li><strong>Nombre:</strong> ${nombre}</li>
            <li><strong>Apellido:</strong> ${apellido}</li>
            <li><strong>Email:</strong> ${correo}</li>
            <li><strong>Asunto:</strong> ${asunto}</li>
          </ul>
          <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
            <strong>Comentarios:</strong>
          </p>
          <blockquote style="font-size: 15px; line-height: 1.5; color: #555; padding: 12px; background-color: #f0f0f0; border-left: 4px solid #8b0000; margin: 0;">
            ${comentarios}
          </blockquote>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;">
          <footer style="text-align: center; font-size: 14px; color: #777;">
            <p>Este correo fue generado automáticamente desde el sitio web de <strong>Génesis de Herencia</strong>.</p>
          </footer>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(202).send("Mensaje enviado correctamente");
  } catch (error) {
    res.status(500).send("Error interno del servidor: " + error.message);
  }
};
