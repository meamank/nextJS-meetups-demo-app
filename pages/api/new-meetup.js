import { MongoClient } from "mongodb";

const Handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.user}:${process.env.pass}@${process.env.host}/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!!" });
  }
};

export default Handler;
