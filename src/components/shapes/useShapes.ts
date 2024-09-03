import { useEffect, useMemo, useState } from 'react';

import { fetchAllSchemas } from '../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../services/shapeService.utils';
import { Shape } from '../../types/shapes.model';

export type ShapesViewState = 'LOADING' | 'SHOW_SHAPES' | 'SHOW_NO_RESULTS'

export const useShapes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const schemas = await fetchAllSchemas();
        const fetchedShapes = await fetchAllShapesFromSchemas(schemas);
        const sortedShapes = fetchedShapes.sort((a: Shape, b: Shape) => a.shortSubject.localeCompare(b.shortSubject));

        setShapes(sortedShapes)
      } catch (error) {
        console.error('Error fetching shapes:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const filteredShapes = useMemo(() => shapes
    .filter(shape => Object
      .values(shape)
      .some(propertyValue => propertyValue &&
                String(propertyValue).toLowerCase()
                  .includes(searchText.toLowerCase()))
    ), [shapes, searchText])

  const state = useMemo<ShapesViewState>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (filteredShapes.length) {
      return 'SHOW_SHAPES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredShapes, isLoading])

  const search = (filter: string) => {
    setSearchText(filter)
  };

  return {
    state,
    shapes: filteredShapes,
    search
  }
}
