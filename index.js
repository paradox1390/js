class ProductsService {
  static baseUrl = new URL("https://dummyjson.com/products");
  static async allProducts() {
    try {
      const res = await (await fetch(ProductsService.baseUrl)).json();
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }
  static async getProduct(id) {
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `/${id}`)
      ).json();
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }
  static async serchProduct(searchStr) {
    const params = new URLSearchParams();
    params.append("q", searchStr);
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `/search?${params}`)
      ).json();
      if (!res.total) {
        return "not found search product";
      }
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }

  static async getLimitProducts(limit = 0, skip = 0, selectProps) {
    const params = new URLSearchParams();
    params.append("limit", limit);
    params.append("skip", skip);
    params.append("select", selectProps);
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `?${params}`)
      ).json();
      if (!res.limit) {
        return "not found product";
      }
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }

  static async getAllCategories() {
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `/categories`)
      ).json();
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }

  static async getProductsCategory(categoryName) {
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `/category/${categoryName}`)
      ).json();
      if (!res.total) {
        return "empty category or bad name of category";
      }
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }

  static async addNewProduct(obj) {
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        })
      ).json();

      const keyObj = Object.keys(obj);
      const keyRes = Object.keys(res);
      const diff = keyObj.filter((key) => !keyRes.includes(key));
      if (diff.length) {
        return {
          message: `Product add, but next props not added <${diff.join(", ")}>`,
          product: res,
        };
      }

      return res;
    } catch (e) {
      e, "error in fetch";
    }
  }
  static async updateProduct(id, obj) {
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        })
      ).json();
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }
  static async deleteProduct(id) {
    try {
      const res = await (
        await fetch(ProductsService.baseUrl + `/${id}`, {
          method: "DELETE",
        })
      ).json();
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }

  static async deleteSeveralProducts(strId) {
    try {
      const arrId = strId.split(",");
      console.log(arrId);
      const promiseArr = [];
      arrId.forEach((item) => {
        promiseArr.push(ProductsService.deleteProduct(item));
      });
      const res = Promise.all(promiseArr);
      return res;
    } catch (e) {
      console.log(e, "error in fetch");
    }
  }
}

// ProductsService.allProducts().then((data) => console.log(data));
// ProductsService.getProduct(100).then((data) => console.log(data));
// ProductsService.serchProduct("sdkgjsldgwgwd").then((data) => console.log(data));
// ProductsService.getLimitProducts(5, 50, "title, price").then((data) =>
//   console.log(data)
// );
// ProductsService.getAllCategories().then((data) => console.log(data));
// ProductsService.getProductsCategory("smartphones").then((data) =>
//   console.log(data)
// );

const product = {
  title: "new product",
  description: "My test product",
  price: 505,
};

// ProductsService.addNewProduct(product).then((data) => console.log(data));
// ProductsService.updateProduct(1, product).then((data) => console.log(data));
// ProductsService.updatePartProduct(100, product).then((data) =>
//   console.log(data)
// );
// ProductsService.deleteProduct(105).then((data) => console.log(data));
ProductsService.deleteSeveralProducts(
  `1,2,3,4,${Math.floor(Math.random() * (1000 - 5 + 1)) + 5}`
).then((data) => console.log(data));
