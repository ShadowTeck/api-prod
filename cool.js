const express = require("express");
const app = express();
const { menu } = require("./menu");

app
  .get("/", (req, res) => {
    const breakfast = menu.filter((item) => {
      return item.category === "breakfast";
    });
    const lunch = menu.filter((item) => {
      return item.category === "lunch";
    });
    const shakes = menu.filter((item) => {
      return item.category === "shakes";
    });
    res.json({
      result: { breakfast: breakfast, lunch: lunch, shakes: shakes },
      message: "yayayayy",
    });
  })

  .get("/search", (req, res) => {
    const { search, limit, filter } = req.query;
    let sortedMenu = [...menu];
    if(filter === 'asc'){
        sortedMenu.sort((a,b) => a.price-b.price)
    }
    if(filter === 'dec') {
        console.log('running');
        sortedMenu.sort((a,b) => b.price-a.price)
    }

    //... creates a new nonmutable copy
    if (search) {
      sortedMenu = sortedMenu.filter((item) => {
        return menu.category.includes(search);
      });
    }
    if (limit) {
      sortedMenu = sortedMenu.slice(0, Number(limit));
    }
    if (sortedMenu.length < 1) {
      return res.json({ results: [], error: "menu not found" });
    }

    res.json(sortedMenu);
  })

  //asc descnding
  .get("/search", (req, res) => {

    // if(!singleMenu) {
    //     //res.status(404).send("Product not found");
    //     res.json({results: [], error: "fuck you"})
    // }

    res.json({ results: [singleMenu], message: "found this bitch" });
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //pramas search

  .get("/:id", (req, res) => {
    //console.log(req.params);
    const { id } = req.params;
    const singleMenu = menu.find((item) => {
      return item.id === Number(id);
    });
    if (!singleMenu) {
      //res.status(404).send("Product not found");
      res.json({ results: [], error: "fuck you" });
    }

    res.json({ results: [singleMenu], message: "found this bitch" });
  })

  .all("*", (req, res) => {
    res.status(404).send("<h1>Page not found</h1>");
  })
  .listen(3000, () => {
    console.log("server listening at port 3000...");
  });
