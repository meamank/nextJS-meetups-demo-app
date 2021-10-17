import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
const NewMeetupPage = () => {
  const router = useRouter();

  const onAddFormhandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name= 'description' content= 'Add your own meetup' />
      </Head>
      <NewMeetupForm onAddMeetup={onAddFormhandler} />;
    </Fragment>
  );
};

export default NewMeetupPage;
