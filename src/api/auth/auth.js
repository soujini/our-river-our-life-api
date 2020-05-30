const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const accessTokenSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

app.post('/login', (req, res) => {
    // Read username and password from request body
    const { id } = req.body;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.id === id });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ id: user.id }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});
