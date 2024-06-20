import Database from 'better-sqlite3';

export const db = new Database('foobar.db');

try {
    db.exec(`
    create table if not exists user (
        id text primary key,
        name text not null,
        email text not null unique,
        password text not null,
        isAdmin bool not null
    );


    create table if not exists category (
        id integer primary key autoincrement,
        category text not null unique
    );

    create table if not exists product (
        id text primary key,
        title text not null,
        description text not null,
        quantity integer not null,
        price integer not null,
        categoryId integer not null,

        foreign key (categoryId)
            references category (id)
            on delete cascade
            on update cascade
    );

    create table if not exists review (
        id integer primary key autoincrement,
        productId text not null,
        review text not null,

        foreign key (productId)
            references product (id)
            on delete cascade
            on update cascade
    );
    create table if not exists checkout_order (
        id integer primary key autoincrement,
        date text not null,
        customerId text not null,
        approved bool not null,

        foreign key (customerId)
            references user (id)
            on delete cascade
            on update cascade
    );

    create table if not exists order_product (
        id integer primary key autoincrement,
        orderId integer not null,
        productId text not null,
        quantity integer not null,
        subtotal integer not null, 

        foreign key (orderId)
            references checkout_order (id)
            on delete cascade
            on update cascade
        
        foreign key (productId)
            references product (id)
            on delete cascade
            on update cascade
    );
    `)

    // let catInsert = db.prepare(`
    //     insert into category (category) values (?);
    // `)
    // console.log(catInsert.run("Categoria2"))

    // let deleteCategory = db.prepare(`
    // delete from category
    // where
    //     id == ?
    // `).run(2);
    // console.log(deleteCategory);

    // let updateCategory = db.prepare(`
    //     update category
    //         set category = ?
    //     where
    //         id == ?
    // `).run("UPDATED", 1);
    // console.log(updateCategory);


    // let insert = db.prepare(`
    //     insert into user values (
    //         ?, ? ,?, ?, ?
    //     );
    // `);
    // insert.run("someuserid60", "nome", "email@mail.com", "password!", "true")

    // let userCount = db.prepare("select count(*) from user;");
    // let { 'count(*)': count } = userCount.get();
    // console.log(count);

    // let userByEmail = db.prepare("select * from user where email = ? limit 1;")
    // console.log(userByEmail.get("email@maiil.com"))
    // db.exec("delete from user;")
    // let res = db.prepare("SELECT * from category limit 100;").all()
    // console.log(res);
    // db.prepare(`
    //     insert into category (category) values (?);
    // `).run("cat1")
    // let insertProduct = db.prepare(`
    //     insert into product values (?, ?, ?, ?, ?, ?);
    // `).run("asdf", "title", "description", 10, 69, 3);
    // console.log(insertProduct);

    // let deleteProduct = db.prepare("delete from product where id == ?;").run("randomid453")
    // console.log(deleteProduct);

    // let approveOrder  = db.prepare(`
    //     update checkout_order
    //         set approved = ?
    //     where
    //         id == ?
    // `).run(true, id)
    // let updateProduct = db.prepare(`
    //     update product
    //         set title = ?,
    //             description = ?,
    //             quantity = ?,
    //             price = ?
    //     where
    //         id == ?;
    // `).run("updated title", "updated desc", 99, 420, "asdf");
    // console.log(updateProduct);

    // console.log(db.prepare(`
    //     insert into review (productID, review) values (?, ?);
    // `).run("asdf", "muito pica"));

    // let insertReview = db.prepare(`
    //     delete from review where id = ?;
    // `).run(1);
    // console.log(insertReview);

    console.log(db.prepare("select * from review where productId = ? limit 100;").all("asdf"))

} catch (error) {
    console.error(error.message)
}