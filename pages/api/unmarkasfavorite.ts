import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';
import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { media } = req.body;

      const existingMovie = await prismadb.media.findUnique({
        where: {
          media_id: media.id.toString(),
        },
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      await prismadb.media.delete({
        where: {
          media_id: media.id.toString(),
        },
      });

      return res.status(200).json(existingMovie);
    }

  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
