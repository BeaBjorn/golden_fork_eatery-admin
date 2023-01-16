# Admin-gränssnitt för projektuppgift - Webbutveckling III - DT173G
## Student : Beatrice Björn

I det här repositoryt ligger de filer som skapats för att kunna konsumera det API som gjorts för den första delen i projektuppgiften för webbuteckling III.  

Inloggningen är för nuvaran de hårdkodad och inloggningsuppgifterna för att använda admin-gränssnittet är :   
Användarnamn : admin  
Lösenord : password  

När en användare loggar in aktiveras en sessions-variabel så att användaren får åtkomst till alla sidor i admin-gränssnittet medan hen är inloggad. Vid utloggning försörs sessions-variabeln och användaren måste logga in på nytt för att komma åt de olika sidrona på webbplatsen. 

En inloggad användare kan modifiera information i databasens tabeller.   
Det finns ett formulär för varje tabell i databasen för att lägga till ny data. Det finns även möjlighet att uppdatera data genom att skriva in ny data direkt i den tabell som visas med existerande data. För att spara de ändringar som gjorts i tabellen klickar man på knappen "update". Det finns även en knapp med namnet "delete" som vid klick radera data från databasen.   

I JavaScript-filerna används fetch-anrop med aktuell endpoint för att hämta, lägga till, uppdatera och radera data från databasen.  
Alla värden som ska läggas in i databasen kontrolleras först i APIets klassfiler för att motverka att tomma fält eller skadlig data lagras i databasen. 

Gulp används för transpilering av koden. För att installera projektet på egen dator läggs filerna i valfri mapp och sedan körs kommandot npm install i terminalen. Detta återskapar de inställningsfiler som finns för projektet (node_modules). 