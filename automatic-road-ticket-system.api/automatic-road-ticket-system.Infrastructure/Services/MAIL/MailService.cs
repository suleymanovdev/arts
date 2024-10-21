using automatic_road_ticket_system.Core.Interfaces.MAIL;
using System.Net.Mail;
using System.Net;

namespace automatic_road_ticket_system.Infrastructure.Services.MAIL;

public class MailService : IMailService
{
    public virtual async Task SendRegistrationVerification(string email, string otp)
    {
        using (var client = new SmtpClient(Environment.GetEnvironmentVariable("MailSettings__SmtpServer"), Convert.ToInt32(Environment.GetEnvironmentVariable("MailSettings__SmtpPort"))))
        {
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential(Environment.GetEnvironmentVariable("MailSettings__Email"), Environment.GetEnvironmentVariable("MailSettings__Password"));

            var message = new MailMessage
            {
                From = new MailAddress(Environment.GetEnvironmentVariable("MailSettings__Email"), "ARTS SUPPORT"),
                Subject = "Registration Verification",
                Body = $@"
                    <html>
                    <body>
                        <p>Please confirm that you want use this as your Automatic Road Ticket System account email address.</p>
                        <p>Your OTP is: {otp}</p>
                    </html>",
                IsBodyHtml = true
            };

            message.To.Add(new MailAddress(email));

            await client.SendMailAsync(message);
        }
    }
}