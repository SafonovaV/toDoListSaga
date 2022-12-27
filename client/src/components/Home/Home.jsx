import React from 'react';
import Form from '../Form/Form';
import MyModal from '../MyModal/MyModal';
import Edit from '../Edit/Edit';
import List from '../List/List';
function Home() {
  return (
    <>
      <Form />
      <MyModal>
        <Edit />
      </MyModal>
      <List />
    </>
  );
}

export default Home;
