\---Test Strategy---



1.What does HRMS do?

&#x20;  Human Resource Management System (HRMS) is the main pillar to give correct salary to employees or workers.It helps both company and workers by giving correct salary this help workers by giving their correct salary as the exact amount for their hard work and for company for not gving excess amount of salary.





2.Who Depends on HRMS?

\*\*Construction Workers\*\*

&#x20;   Constructions workers depends on HRMS in which they dont know about how system works or how they depend on HRMS.Because the daily workers need there daily wages according to there work and they depend on there wages for there expenses even a 200 rupees less salary can effect them so the daily workers will really more depend on them even they dont do any mistakes as they have no access to system if anything happens to system or website they are the most suffered ones.

\*\*Site Manager\*\*

&#x20;   Site Manager will works on sites and record the time of workers. As they work in sites there may have poor internet and may be due to long working hours they may enter wrong time it will effect the workers suppose site manger entered a worked time as 24 days but he actually done for 28 days so this mistakes only cathed after payslip and for correction it may take time and proper documents also needed for proof of working Here it nobody catches util the month end.

\*\*Payroll Operator\*\*

&#x20;  Payroll Operator will process the workers salaries.He will handle hundreds of workers salaries and he will use some sort of formulaes to process the work if he enter one wrong number there may be hundreds of wrong salaries.And also if overtime is calculated incorrectly all those receive incorrect salaries.this may lead overpayment or low payment either worker or company may effect for this.

\*\*Newly Hired Developer\*\*

&#x20;  He will develope but he will be scared to touch the payroll module becuse payroll module is very tough any one mistake can loss huge money and he has no documentation explaining the code and tests to verify that code.it may be unintentional but causes a lot of trouble.

\*\*Senior Developer\*\*

&#x20;  Senior Developer knows the entire code pf payroll system because of his experience.He belives that writing test takes extra time and prefers fixing problems directly.HE can solve bugs within less time but onlu when he was present.Think now when i problem or bug arrived and he is not there at that time how can we solve that.





3.Real Incidents

\*\*incident1\*\*

&#x20;  In this Dev an employee added feauture needing the DB connection string.To connect the application he needs a database connection string such as database URL, Udserame, and password.This one worked perfectly on his own system because the required database is already existed there but when it comes to application deployes to production server he forgot the to add the database connection and as a result the application not conntected and it crashed a last day of month.in this incident 200 payslips failed. 38 workers got payslips 3 days later.This was directly effected to workers and company as well.

\--My solution--

&#x20;  after this problem i created a test case that checks whether invalid URLs return a 404 respond instead of crashing.A successful deployed must correctly handle unknown routes. If the application cannot respond correctly, the deployes is likely broken

example-- the request is   GET/random-page

&#x20;          expected output is  404 Not Found   by my test test instead of crashing server it will return like this



\*\*incident 2\*\*

&#x20;   In this a developer changes the backend API endpoint like if old ApI is /api/attendance to new /api.attendences due to this frontend is not updated so the frontend still tried to call /api/attendance but backend will not get as it accepts now new one.It caused 404 error for 2 days. Nobody noticed.Due to this 47 workers overtime never logged the workers didn't know anything about this but when tried to logged it showed 404 not found and due to this manually enteries for that 47 has needed at that but but the worst part is 12 entries excluded from payslips permanently.As a result workers got less salary.

\--My Solution--

&#x20;   My test case checks that all API end points exist or not.If a route is accidently renamed or removed, the automated test fails during development allowing developers to fix y=that issue before releasing the application.





4.BUGS

\--Bug1--

&#x20;   In this login page if any user sends empty username and password like {} then server is hanging and not giving any response because in Auth.js line 5 DataPegawai.findOne directly checking username but username is undefined and before database query there is no validation because of this sequelize throws internal error and server hangs.This will affect all workers because any person can simply send one empty login request and server may go down if server goes down around 200 workers cannot login and cannot see there payslips.Here before sending database query username should be checked if username is not present then return 400 message username required instead of querying database.



\--Bug2--

&#x20;   In this SESS\_SECRET is taking from .env file if production server not having .env file same like first incident then session secret becomes undefined but application still running because express session only giving warning and because of this all sessions become insecure and any logged in user session may be forged.This will affect all users because attacker may misuse there login session.Here while application starting only it should check SESS\_SECRET is present or not if not present application should stop immediately instead of continuing.



\--Bug3--

&#x20;   Here salary fields accepting any values like negative values zero and very large values because there is no validation before saving data.If payroll operator entered overtime value 0 instead of 5000 by mistake application accepts it and salary will be calculated wrong.This is same type of mistake happened in previous incident where company lost 1.8 lakh and if same thing happens again around 200 workers salary may affected.Here before saving salary minimum and maximum values should be checked and if unusual value entered payroll operator should get warning.



\--Bug4--

&#x20;  In login route there is no rate limit because of this any attacker can send thousands of login requests automatically and try many passwords until correct password found.This will affect workers because worker account may hacked and salary details may exposed.Here login attempts should be limited like only 5 attempts for every 15 minutes.



\--Bug5--

&#x20;  In this CORS configured only for localhost3000 but when application deploys production frontend URL changes because of this frontend cannot communicate with backend and complete application stops working.This will affect site manager because attendance cannot submit and payroll operator cannot generate payslips this is same impact happened in incident1.Here localhost should not hardcoded instead frontend URL should come from environment variable.



\--Bug6--

&#x20;  Here express session showing req.secret deprecated warning now application working but future versions may stop working because this option is deprecated.This is not affecting application now but later it may create problems so configuration should updated according latest version.



\--Bug7--

&#x20;   In this db.sync is commented so new developer cloning this project and running application gets database errors because tables not creating automatically and there is no documentation explaining why this error coming.New developer already scared to touch payroll module because no documentation available so he may spend many hours finding issue.Here proper setup documentation should be added explaining database setup process.



