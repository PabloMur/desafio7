const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

export async function enviarEmail(msg) {
  try {
    await sgMail.send(msg);
    return { response: "Informacion enviada al dueño de la mascota" };
  } catch (error) {
    console.error(error);
  }
}
