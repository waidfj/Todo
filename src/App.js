import { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
// import { Cancel } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Cancel } from "@material-ui/icons";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  textInput: {
    flex: 1,
    marginBottom: 10,
  },
  todos: {
    marginTop: 20,
  },
  item: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    flex: 1,
  },
  task: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    alignItems: "center",
    "&:hover": {
      background: "rgb(231, 230, 225, 0.5)",
    },
  },
  delete: {
    marginRight: 20,
    color: "rgba(225, 0, 0, 0.5)",
    cursor: "pointer",
    "&:hover": {
      color: "rgba(170, 0, 0, 0.9)",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [item, setItem] = useState();
  const [items, setItems] = useState([]);
  const typeItem = (e) => setItem(e.target.value);

  useEffect(() => {
    db.collection("items").onSnapshot((docs) => {
      let allTasks = [];
      docs.forEach((doc) => allTasks.push(doc.data().task));
      setItems(allTasks);
    });
  }, []);

  const addItem = async () => {
    db.collection("items")
      .add({
        task: item,
        done: false,
      })
      .then(() => setItem(""));
  };

  const deleteItem = async (task) => {
    db.collection("items")
      .where("task", "==", task)
      .get()
      .then((docs) =>
        docs.forEach((doc) => db.collection("items").doc(doc.id).delete())
      );
  };
  // const setDone = async (task) => {
  //   db.collection("items")
  //     .where("task", "==", task)
  //     .get()
  //     .then((docs) =>
  //       docs.forEach((doc) =>
  //         db.collection("items").doc(doc.id).update({ done: true })
  //       )
  //     );
  // };

  return (
    <Grid container direction="row">
      <Grid lg={3}></Grid>
      <Grid container className={classes.todos} lg={6}>
        <Grid container>
          <TextField
            item
            className={classes.textInput}
            onChange={typeItem}
            value={item}
            label="add your item"
          />
          <Button item onClick={addItem}>
            Add
          </Button>
        </Grid>
        <Grid container direction="column">
          {items.map((task, index) => (
            <Grid
              container
              item
              button
              className={classes.task}
              // onClick={() => setDone(task)}
            >
              <Typography variant="h5" className={classes.item}>
                {task}
              </Typography>
              <Cancel
                button
                item
                className={classes.delete}
                onClick={() => deleteItem(task)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid lg={3}></Grid>
    </Grid>
  );
}

export default App;
