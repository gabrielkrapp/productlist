import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { BiSearch } from "react-icons/bi";
import productsData from '../data/products.json';

const categories = [...new Set(productsData.data.nodes.map((product) => product.category.name))];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productsData.data.nodes);

  const filterProducts = (term, categories) => {
    const filtered = productsData.data.nodes.filter((product) => {
      const searchTermMatch = product.name.toLowerCase().includes(term.toLowerCase());
      const categoryMatch =
        categories.length === 0 || categories.includes(product.category.name);
      return searchTermMatch && categoryMatch;
    });
    return filtered;
  };

  useEffect(() => {
    const updatedFilteredProducts = filterProducts(searchTerm, selectedCategories);
    setFilteredProducts(updatedFilteredProducts);
  }, [searchTerm, selectedCategories]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchIconClick = () => {
    const updatedFilteredProducts = filterProducts(searchTerm, selectedCategories);
    setFilteredProducts(updatedFilteredProducts);
  };

  const handleCategoryChange = (event) => {
    const categoryName = event.target.name;
    const isChecked = event.target.checked;

    setSelectedCategories((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, categoryName];
      } else {
        return prevSelected.filter((category) => category !== categoryName);
      }
    });
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={2}>
        <Typography variant="h4">
          <span style={{ fontWeight: 900, color: '#140040' }}>O QUE VOCÊ</span>{' '}
          <span style={{ fontWeight: 900, color: '#4D9E92' }}>ESTÁ PROCURANDO?</span>
        </Typography>
        <Grid container alignItems="center" mt={2} spacing={1}>
          <Grid item xs={10} md={8}>
            <TextField
              label="BUSQUE AQUI"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearchIconClick}>
                    <BiSearch />
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="row" mb={2} mt={5}>
        <Box width="30%" pr={2} >
          <Typography borderBottom={1} pb={2} mb={3} variant="h6">Filtros</Typography>
          <Box display="flex" flexDirection="column">
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                    name={category}
                  />
                }
                label={category}
              />
            ))}
          </Box>
        </Box>
        <Box width="70%" pl={2}>
          <Typography borderBottom={1} pb={2} mb={3} variant="h6" gutterBottom>
            {filteredProducts.length} Resultados
          </Typography>
          <Box pb={2}>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                  <Box textAlign="center" p={2}>
                    <img src={product.images[0].asset.url} alt={product.images[0].alt} width="100%" />
                    <Typography fontWeight={700} variant="subtitle1">{product.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductList;
