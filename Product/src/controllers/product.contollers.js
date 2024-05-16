import { Product } from "../model/product.model.js";

export const productadd = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    if ([name, price, quantity, description].some((x) => x?.trim() === "")) {
      return res.status(400).json({ message: "all field are required" });
    }

    const listingIndb = await Product.create({
      name,
      price,
      quantity,
      description,
    });

    return res.status(200).json({ data: listingIndb });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const updateadd = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body;

    const findinDb = await Product.findById({ _id: id });

    if (!findinDb) {
      return res.status(400).json({ message: "product is not find" });
    }

    if ([name, price, quantity, description].some((x) => x?.trim() === "")) {
      return res.status(400).json({ message: "all field are required" });
    }

    const listingIndb = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        quantity,
        description,
      },
      { new: true }
    );

    return res.status(200).json({ data: listingIndb });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const deletelist = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteindb = await Product.findByIdAndDelete({ _id: id });

    if (!deleteindb) {
      return res.status(400).json({ message: "product is not found" });
    }

    return res
      .status(200)
      .json({ message: "your product is successfully delete" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const buyproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
  
    const buyprod = await Product.findById({ _id: id });
    if (!buyprod) {
      return res.status(400).json({ message: "product is not found" });
    }
    if (quantity > buyprod.quantity) {
      return res.status(400).json({ message: "quantity is not available" });
    } else {
      const newquantity = buyprod.quantity - quantity;
      const newquant = await Product.findByIdAndUpdate(
        buyprod._id,
        {
          quantity: newquantity,
        },
        { new: true }
      );
  
      return res.status(200).json({data:newquant})
  
    }
  } catch (error) {
    return res.status(500).json({ error: error });
    
  }
};
