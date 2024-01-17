import { useEffect } from "react";
import { PlantCard } from "../../../../components/plantCard/PlantCard";
import { plantStore } from "../../../../stores/usePlantStore";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./BestSellers.css";

export const BestSellers = () => {
  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlantsByCategory, isLoading } = plantStore();

  console.log("POPULAR PLANTS:", plants);

  useEffect(() => {
    fetchPlantsByCategory("popular");
  }, [fetchPlantsByCategory]);

  return (
    <section className="best-sellers-wrapper">
      <div className="best-sellers-container">
        <h2 className="section-title">
          Best Sellers{" "}
          <p className="h2-p">
            A wise person once said that <br />{" "}
            <em>"if everyone likes it, I like it too"</em>
          </p>
        </h2>
        <div className="products-wrapper-scroll">
          {/* {isLoading ? (<Skeleton variant="rounded" width={200} height={260} />) : (<PlantCard plants={plants} />) }  */}
          {isLoading ? (
            // Show skeleton loader when loading
            <Grid container spacing={1} width="190%" wrap="nowrap">
              {[1, 2, 3, 4].map((item) => (
                <Grid item key={item} xs={4} sm={1} md={3} lg={2}>
                  <Box sx={{ p: 0 }}>
                    <Skeleton variant="rounded" width="100%" height={200} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            // Render PlantCard when not loading
            <PlantCard plants={plants} />
          )}
        </div>
      </div>
    </section>
  );
};
