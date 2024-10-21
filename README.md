# automatic-road-ticket-system
Avtomatik Yol vərəqəsi sistemi

Setup:
.env in WebApi:

```
ConnectionStrings__DefaultConnection=Server=localhost;Database=automaticroadticketsystem;User Id=postgres;Password=root;
Authentication__Salt=4a6945fe16f38425f2272bc51a5aa40aebc15445733baac7baddf4893309d1ee
JWTSettings__Key=b026d7a156e9461f932183073a3ae993812ba8855bc509e1a9fac07f5bd8e9e1
JWTSettings__Issuer=automatic-road-ticket-system
JWTSettings__Audience=automatic-road-ticket-system
JWTSettings__DurationInMinutes=60
MailSettings__SmtpServer=
MailSettings__SmtpPort=587
MailSettings__Email=
MailSettings__Password=
```
