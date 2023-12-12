import { useEffect } from "react";
import "./collectionRecipes.css"

const getAPI = 'http://localhost:3001/recipes';

export const CollectionRecipes = () => {

    const fetchCollectionRecipes = async () => {
        try {

            const response = await fetch(getAPI, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Oh no, error, HTTP! ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCollectionRecipes()
    }, [])

    return (
        <div>CollectionRecipes</div>
    )
}

