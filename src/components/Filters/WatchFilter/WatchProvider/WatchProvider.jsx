import { useContext, useEffect, useState } from 'react';
import style from "./watch-provider.module.scss";
import WatchElement from "./WatchElement/WatchElement";
import { fetchOTTPlatforms } from "../../../../service/api";
import { notifyError } from '../../../../utils/helpers';
import SelectedFilterContext from '../../../../pages/CategoriesPage/context';

const WatchProvider = () => {
  const [watchProviders, setWatchProviders] = useState([]);
  const { OTTRegion, contentType } = useContext(SelectedFilterContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchOTTPlatforms(contentType, OTTRegion);
        setWatchProviders(res);
      }
      catch (err) {
        notifyError(err);
      }
    })();
  }, [contentType, OTTRegion]);

  return (
    <ul className={style['watch-provider']}>
      {
        watchProviders.map((watchProvider) => <WatchElement key={watchProvider.provider_id} watchProvider={watchProvider} />)
    }
    </ul>
  );
};
export default WatchProvider;
