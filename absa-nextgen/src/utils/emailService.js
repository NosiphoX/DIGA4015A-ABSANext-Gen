export async function sendWelcomeEmail(user) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.log("EmailJS is not configured yet.");
    console.log("Welcome email preview:", {
      to_name: user.name,
      to_email: user.email,
      message: `Welcome to ABSA NextGen Wealth Studio, ${user.name}. Your profile has been created and your financial journey is ready to begin.`,
    });

    return {
      success: false,
      simulated: true,
      message: "Email preview created. Add EmailJS keys to send real emails.",
    };
  }

  const emailjs = await import("@emailjs/browser");

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_name: user.name,
      to_email: user.email,
      message: `Welcome to ABSA NextGen Wealth Studio, ${user.name}. Your profile has been created and your financial journey is ready to begin.`,
    },
    {
      publicKey,
    }
  );

  return {
    success: true,
    simulated: false,
    message: "Welcome email sent.",
  };
}