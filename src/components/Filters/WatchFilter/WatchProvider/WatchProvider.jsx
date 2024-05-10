import { useContext } from 'react';
import style from "./watch-provider.module.scss";
import WatchElement from "./WatchElement/WatchElement";
import SelectedFilterContext from '../../../../pages/CategoriesPage/context';

const WatchProvider = () => {
  const { watchProvidersList } = useContext(SelectedFilterContext);

  return (
    <ul className={style['watch-provider']}>
      {
        watchProvidersList.map((watchProvider) => <WatchElement key={watchProvider.provider_id} watchProvider={watchProvider} />)
    }
    </ul>
  );
};
export default WatchProvider;
