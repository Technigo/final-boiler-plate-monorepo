
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logos from '../components/Logos';
import { userStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';




import { recipeStore } from "../stores/recipeStore"
import { PromptForm } from '../components/PromptForm';
import { CollectionRecipes } from "../components/collectionRecipes/CollectionRecipes"

export const Login = () => {

  return (
    <>
      <PromptForm />
      <CollectionRecipes />
    </>
  );
};

