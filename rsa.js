const nodersa = require('node-rsa');

const publicKeySsl = '-----BEGIN PUBLIC KEY-----\n'+
'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKeuIH5FbQxtilF05z35lpmh2WOORGfW\n'+
'7JUJrYcMZYQVonXXjgGT5xdT32ssyCiRs2ufXCPjKnQ+riNP+qQUG4cCAwEAAQ==\n'+
'-----END PUBLIC KEY-----'


const privateKeySsl = '-----BEGIN RSA PRIVATE KEY-----\n'+
'Proc-Type: 4,ENCRYPTED\n'+
'DEK-Info: AES-256-CBC,0FD7E23D4DE5778AED4CA440D1D99AE4\n'+
'\n'+
'DUZNna6SjL40LAueuZrWQrV+Tvz4+567ly8hscK4wStuEw9UVrhFsXS2WCyv4cjf\n'+
'+OBD0x0JdQQO9/eFEX0J+593hP/dnmWZlKPLZBzNEgHMTJ2XYt3KxD5W757rBZyV\n'+
'8AghVMRvgSKsKUoaV738HJRHksPT0z9qGFdwAZSLvvUXKIaGqujoNxmj4VxH5Zd8\n'+
'xjHTJtdZv8bGVbH80EAtHl7Vbrxj2lThj+aFtMKts0RzW534zNHBiBpSkgnpZjG2\n'+
'e1cGL6xCQwUeMXHoxeXpZ8i7Xu1mt3zs+b+kaNESUX/otd1EdHWZl5qkPZ/MChzN\n'+
'XEp6uBVSm3sbuSQkMLwwwtaMaIFUJ1HTd5sGQ6VTt9PZ3gaXxIflwYBRvw/R0YrZ\n'+
'B8WA2NY+hRSQlk5/fFOJgTQKhBWfqOnxzAnpiumz0j8=\n'+
'-----END RSA PRIVATE KEY-----'


const publickey = new nodersa(publicKeySsl)

const privateKey = new nodersa(privateKeySsl,'aes256')

const text = 'text'

const encript = publickey.encrypt(text,'base64')
console.log(encript)


const decript = privateKey.decrypt(encript,'utf8')
