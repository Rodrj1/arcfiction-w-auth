import { Person } from '../types';
import MediaSlider from './MediaSlider';
import PersonCard from './PersonCard';

export default function PersonCollection({ cast }: { cast: Person[] }) {
  return (
    <section className="relative">
      <h2 className="text-xl text-slate-300 mb-3 text-center font-bold">
        CAST
      </h2>

      <MediaSlider id="cast">
        <ul className="flex gap-5 w-max m-auto">
          {cast.map((person) => (
            <li key={person.cast_id}>
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
      </MediaSlider>
    </section>
  );
}
