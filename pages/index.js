import { MongoClient } from "mongodb";
import Head from 'next/head'
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name= 'description' content= 'Browse huge list of highly active meetups.' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.user}:${process.env.pass}@${process.env.host}/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
