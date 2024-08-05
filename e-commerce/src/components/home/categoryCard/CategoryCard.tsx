import { Category } from '@/api/models';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
  onCategoryChange: (id: number | null) => void;
}

function CategoryCard(props: CategoryCardProps) {
  const { onCategoryChange } = props;
  const { id, name, image } = props.category;

  const handleClick = () => {
    onCategoryChange(id);
  };

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: BORDER_RADIUS_M,
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        paddingInline: 4,
        paddingBlock: 6,
        backgroundColor: GRAY_BG,
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Link to="/catalog" style={{ textDecoration: 'none', width: '100%', height: '100%' }}>
        <Stack gap={2} width="100%" height="100%">
          <CardMedia
            component="img"
            image={image}
            sx={{
              borderRadius: BORDER_RADIUS_M,
              width: '100%',
              maxHeight: '100%',
              aspectRatio: '3/2',
            }}
          />
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Typography variant="h4">{name}</Typography>
          </CardContent>
        </Stack>
      </Link>
    </Card>
  );
}

export default CategoryCard;
