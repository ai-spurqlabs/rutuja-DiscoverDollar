// Converted for Playwright - Sends email with Allure report links
require('dotenv').config();
const nodeoutlook = require('nodejs-nodemailer-outlook');

try {
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.Auditor,
            pass: process.env.A_Password,
        },
        from: process.env.Auditor,
        to: ['qa-reports@discoverdollar.com', 'manisha.sanghavi@spurqlabs.com'],
        subject: 'Allure Reports for Cantire Resolve UI',
        html: '<h1>Allure Reports of Cantire Resolve UI Automation Suite</h1> <p> Please find the link of Allure report below.</p> <p>Click here to open <a href="https://discoverdollartech.github.io/cantire-resolve-automation-code/">Allure Reports</a></p> <p> This is an auto-generated email by the QA Team.</p> <p>  </p> <p> Thanks & Regards,<br> QA Team</p > ',

        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i),
    });
    console.log('Email sent successfully');
} catch (error) {
    console.error('Error sending email:', error);
}
