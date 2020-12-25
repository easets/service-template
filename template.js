const replace = require('replace-in-file');
const options = {
    files: [".github/workflows/test.yml/", ".env*",
        "dev/docker-compose.yml",
        "package*.json",
    "src/routes/swagger/index.js"],
    from: /{{template}}/g,
    to: 'bar',
};

try {
    const results = replace.sync(options);
    console.log('Replacement results:', results);
}
catch (error) {
    console.error('Error occurred:', error);
}
