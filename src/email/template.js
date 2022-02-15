require('dotenv').config({ path: "./config.env" });

const websiteLink = process.env.NODE_ENV === "development" ? process.env.FRONTEND_PORT : process.env.WEBSITE_URL;
const name = process.env.NAME;

exports.authTemplate = (message, des, url) => `
    <html>
        <body>
            <table style="width: 100%;border-spacing: 0px;background: white;">
                    
                <tr>
                    <th style="text-align: center;padding: 0.5rem;font-size: 1.4rem">            
                        <h2>
                            <a href="${websiteLink}" style="text-decoration: none;color: black">${name.toUpperCase()}</a>
                        </h2>
                    </th>
                </tr>
                <tr class="message">
                    <td style="height: 50px;text-align: center;">
                        ${message} <br/> If you did not request this email please just ignore this. 
                    </td>
                </tr>
                <tr class="link">
                    <td style="text-align: center; height: 200px">
                        <a class="link" href="${websiteLink}${url}" style="text-decoration: none; color: black; border: 1px solid black; padding: 2rem 5rem; border-radius: 10px"> 
                            ${des}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="height: 50px;">
                        <footer style="margin-top: 5rem; text-align: center; padding: 0.5rem; border-top: 1px solid black">
                        &#169; Meusic, 2022. <br> Please do not reply to this email. 
                        </footer>
                    </td>
                </tr>
            </table>
        </body>
    </html>
`