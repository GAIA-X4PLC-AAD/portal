export const toTypeLabel = (type) => {
  let typeLabel;
  switch (type) {
  case 'services': typeLabel = 'Service'; break;
  case 'data': typeLabel = 'Data'; break;
  case 'nodes': typeLabel = 'Node'; break;
  default: typeLabel = 'Service/Data/Node'
  }
  return typeLabel;
}
