import Link from "next/link";
import { Container, Table, Button } from "react-bootstrap";
import { useState } from "react";
import { deleteData,fetchData } from "@/services/mix";


export default function Index({ meals }) {

  const [list, setList] = useState(meals)
  const [showServing_100g, setshowServing_100g] = useState(true)
  const [showServing_portion, setshowServing_portion] = useState(false)
  const [showServing_oz, setshowServing_oz] = useState(false)
  
  const showServingFilter = (filter) =>{
    setshowServing_100g(false)
    setshowServing_portion(false)
    setshowServing_oz(false)
    if(filter == "100g")
      setshowServing_100g(true)
    if(filter == "portion")
      setshowServing_portion(true)
    if(filter == "oz")
      setshowServing_oz(true)
  }

  const refresh = async () => setList(await fetchData(`${process.env.backurl}/api/meal/findAll`))
  const deleteOneMeal = async (id) => deleteData(`${process.env.backurl}/api/meal/${id}`).then(refresh)

  return (
    <Container>
      <h1>List of Meals</h1>
      <Link className="btn btn-outline-success" href={`/meals/admin/create`}>Create new meal</Link>
        <hr/>
      <Button variant="outline-success" onClick={() => showServingFilter("100g")}>
      Serving_size_100g
      </Button>
      &nbsp;
      <Button variant="outline-success" onClick={() => showServingFilter("portion")}>
      serving_size_portion
      </Button>
      &nbsp;
      <Button variant="outline-success" onClick={() => showServingFilter("oz")}>
      serving_size_oz
      </Button>
      <hr/>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>FoodCategory</th>
            <th>FoodItem</th>
            {showServing_100g ? <><th>Serving_size_100g</th><th>calories_100g</th></>:
            showServing_portion ? <><th>showServing_portion</th><th>calories_portion</th></>:
            showServing_oz ? <><th>Serving_size_oz</th><th>calories_oz</th></>:<><th>Serving</th><th>calories</th></>  }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((meal, index) => {
            return (
              <tr key={index}>
                <td key={meal.FoodCategory}>{meal.FoodCategory}</td>
                <td key={meal.FoodItem}>{meal.FoodItem}</td>

                {showServing_100g ? 
                <><td key={meal.serving_size_100g}>{meal.serving_size_100g}</td>
                <td key={meal.calories_100g}>{meal.calories_100g}</td></>
                :
                showServing_portion ? 
                <><td key={meal.serving_size_portion}>{meal.serving_size_portion}</td>
                <td key={meal.calories_portion}>{meal.calories_portion}</td></>
                :
                showServing_oz ? 
                <><td key={meal.serving_size_oz}>{meal.serving_size_oz}</td>
                <td key={meal.calories_oz}>{meal.calories_oz}</td></>
                :<><td>-</td><td>-</td></>  }

                  <td key={meal._id}>
                  <Link className="btn btn-outline-secondary me-3 ms-3" href={`/meals/admin/edit/${meal._id}`}>Edit</Link>
                  <Button onClick={() => deleteOneMeal(meal._id)} variant="outline-danger">Delete</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export async function getServerSideProps() {
  const data = await fetchData(`${process.env.backurl}/api/meal/findAll`);
  return {
    props: {
      meals: data
    }
  }
}