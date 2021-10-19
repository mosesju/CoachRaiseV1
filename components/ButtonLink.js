import Link from 'next/link'
export default function ButtonLink({pageLink, linkText}) {
    return(
        <button>
            <Link href={pageLink}>
                <a>{linkText}</a>
            </Link>
        </button>
    )
}