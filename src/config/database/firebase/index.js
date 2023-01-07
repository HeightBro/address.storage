const firebase = () => {
    return {
        firebase: {
            collection_path: "messengers/telegram",
            entities: {
                cells: "cells",
                cells_products: "cells_products",
                products: "products",
                users: "users",
                user_processes: "user_processes",
            },
        },
        service_account: {
            type: "service_account",
            project_id: "address-storage",
            private_key_id: "f30be29b43ca2507b2403b529f7be07c213f6613",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDB9q1KSoP4/tsf\nYlSToaqREULnHOkKx0dVr7aPu9Xa0AwthAy+h0vhMYJBmdELsNxrDBgYNdQzcvJD\nh4/dRU63zTMxcTYcUz7vY9UqeA+5WV1Q7E0D/G9usShtX/61Ns4Quxp5X5X2SG6F\nIyrv2okebpt8YMovzjeOaPnw2vpwSufej8zT7XBRh8p/c+Az9T4CPRWHWvLs5IP9\nJ+J/t64jUk6hUODvKe/ZCR8cXWuieeHkhY/LqtYlZbO+ThzA5lTdQgBI6M/v6Qp/\niRRpCc96M3o6rGQAB2cGYBcsPYRVLjLdiS/hw3uQMKTIpT9zMFuBT8BaglTavIBJ\n9oCAMt6zAgMBAAECggEAE+mHEMFlmwJO7IHjvOQz5oCnJaLKKdkbcaiATXEzGyuQ\nlHuh801gdNXoUWPBGjol5rdvIc0k48NBK72W/1hGJIhkYQcGTxIcu+a704hP1O9f\nrRcVMPuRVQPK6q+YLnJZ5U3QAfXWJ1p4PiLGHamJuh4QyEwHdbDt8yjDv/47B5v6\n5abwxos74G9RlOZrgkxBsMJK3eE8Hh2MswBZKssvHR7Hmepa8ov0iwtmTZFforfd\n0/6b0c0uvOeCHgnZkla4iyOBC8xT1xyD4FI8BSJjeJ6Pd/9kTyMylaXRIwK1WJ+r\nkCQrDGcWM9rgsBu3+Wh8sSXelIREw1b9/8US3aNXgQKBgQD8e8bZ3ieeZSsmOO+H\ncBld5DbztRQ11H20o/k5+BC2lvkZeluJUEEAUQ9k1nN8Cp/Fr6NdpHLoYgtmt8wO\nQaSlixv0Za5R6QqVvQNtNsV3OH5Un8BsG9qI/noHKR6zdJbXbCXHy5/wmxdfj49m\nveSjM3dy7694YkHaBp05rf6V2QKBgQDEqj+5hjW/Nx9hc5FrnEu+I1oCKEPsTU29\n+gR+GUtFKJXoasPYMfoERLST4cdXPNsAqeiYanPf/FeZN/llZV8aGCigdgyKrkZy\nce2XsiziCQMR38Jn918HF7ZRbTWh33y3Ewjg6U+U5ALgWmbQS1jho+R9HgGwpujK\niKKJYaUFawKBgQDnUVOmybUMlm3I8ALr2BU1g1+hOjaQ9uRQeqZcqNxPHNSNth9l\nF4TmEF4FKcDWVTl6OWd35LFuHF2LtzqZmSSKkn+DEyF5ZAPRmkEobzTM/JIpX89A\nfOhj+Jm+M7sv+NI1/ZxDh1g6bS0l3PYp0DJIH2ABinz90y+327VyYenMSQKBgGq/\nkolsXP4muITYCyYjF0XkwHWNT5kTONCWxhuANUgbyIr4cMeIERKCDJZ8pgwnPyS0\nFUmt9qmsuguzw06TYLS0SlEW4qXgBOMYDgQaNZyXkbABCfAO6OjbqR23rrXnrjVd\nQqN6YLULsrf+ufH0BBGuOVbkk7xETPWqhrcVZlJzAoGBANBxmu/PgMLywQzFrFC8\nCaCH4o0lsOMepBukA1makL4h3oOnon77moXgs8DlfVX13e903hETmrjcUbZpvjS3\n1h9GES3GJd8eBGB9TxE0Qfvm1yz5/z+i+HyOq75ITxsxawIbXs8KTJK28axtf79Y\nrqlrYssbVUTLZ48E1hIWNBjx\n-----END PRIVATE KEY-----\n",
            client_email: "firebase-adminsdk-u96bl@address-storage.iam.gserviceaccount.com",
            client_id: "103970998680332990139",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u96bl%40address-storage.iam.gserviceaccount.com"
        },
    }
}

module.exports = firebase();