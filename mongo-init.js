conn = new Mongo();
db = conn.getDB("invoicedb");

db.role.insert({name:"USER"});
db.createUser(
    {
        user: "user",
        pwd: "root",
        roles: [
            {
                role: "readWrite",
                db: "invoicedb"
            }
        ]
    }
);

