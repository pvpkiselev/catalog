import { useEffect } from 'react';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import useCategories from '@/hooks/useCategories';

function Categories() {
  const { categories, selectedCategoryId, getCategories, changeCategory } = useCategories();

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const validValue = event.target.value === '' ? null : Number(event.target.value);
    changeCategory(validValue);
  };

  const defaultValue = '0';
  const actualValue = selectedCategoryId === null ? defaultValue : String(selectedCategoryId);

  return (
    <Box width="100%">
      <Typography variant="h6" pb={3}>
        Category
      </Typography>
      <FormControl fullWidth>
        <Select
          onChange={handleCategoryChange}
          value={actualValue}
          id="category"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={defaultValue}>All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Categories;
