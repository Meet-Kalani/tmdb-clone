import { useContext, useEffect, useState } from 'react';
import style from "./watch-provider.module.scss";
import WatchElement from "./WatchElement/WatchElement";
import { fetchOTTPlatforms } from "../../../../service/api";
import { notifyError } from '../../../../utils/helpers';
import SelectedFilterContext from '../../../../pages/CategoriesPage/context';

const WatchProvider = () => {
  const [watchProviders, setWatchProviders] = useState([]);
  const { selectedOTTRegion, contentType } = useContext(SelectedFilterContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchOTTPlatforms(contentType, selectedOTTRegion);
        setWatchProviders(res);
      }
      catch (err) {
        notifyError(err);
      }
    })();
  }, [contentType, selectedOTTRegion]);
  return (
    <ul className={style['watch-provider']}>
      {
        watchProviders.map((watchProvider) => <WatchElement key={watchProvider.provider_id} watchProvider={watchProvider} />)
    }
    </ul>
  );
};
export default WatchProvider;
