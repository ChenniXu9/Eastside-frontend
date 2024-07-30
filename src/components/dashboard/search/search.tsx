"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import styles from "./search.module.css";

const Search = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", 1);

        if (e.target.value) {
            e.target.value.length > 2 && params.set("query", e.target.value);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params}`);
    }, 300);

    return (
        <div className={styles.container}>
            <MdSearch />
            <input
                type="text"
                placeholder={placeholder}
                className={styles.input}
                onChange={handleSearch}
            />
        </div>
    );
};

export default Search;
