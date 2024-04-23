import { useState } from "react";
import style from "./nested-link.module.scss"
import PropTypes from "prop-types";

function NestedLink({ label, href, nestedLinks }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleNestedNavigationVisibility = () => {
        setIsVisible((previousValue) => {
            return !previousValue;
        });
    };

    return (
        <li className={style["navlink-wrapper"]}>
            <a
                href={href}
                className={style["navlink"]}
                onClick={handleNestedNavigationVisibility}
            >
                {label}
            </a>
            {isVisible && (
                <ul className={style["nested-navlinks"]}>
                    {nestedLinks.map(({ id, label, href }) => {
                        return (
                            <li key={id} className={style["nested-navlink-wrapper"]}>
                                <a href={href} className={style["nested-navlink"]}>
                                    {label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

NestedLink.propTypes = {
    label: PropTypes.string,
    href: PropTypes.string,
    nestedLinks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            label: PropTypes.string,
            href: PropTypes.string,
        })
    ),
};

export default NestedLink;