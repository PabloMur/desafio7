const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: "polillomurillo@gmail.com", // Change to your recipient
//   from: "pablomurillo.sp@gmail.com", // Change to your verified sender
//   subject: "Avistamiento de tu MASCOTA!",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

export async function enviarEmail(msg) {
  try {
    await sgMail.send(msg);
    return { response: "Informacion enviada al dueño de la mascota" };
  } catch (error) {
    console.error(error);
  }
}
