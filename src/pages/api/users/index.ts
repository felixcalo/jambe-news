import { NextApiRequest, NextApiResponse } from 'next';

export default function users(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    name: 'Felix',
    lastname: 'Lucas',
  };
  return res.json(data);
}
function subscription(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    name: 'Felix',
    lastname: 'Lucas',
  };
  return res.json(data);
}
