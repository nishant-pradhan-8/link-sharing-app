import RightMainHeader from "./rightmainheader"
import RightMainLink from "./rightmainlink"
import RightMainSave from "./rightmainsave"
function RightMain(){
    return(
    <section className = "details-section">
        <RightMainHeader />
        <RightMainLink />
        <RightMainSave />
    </section>

    )
}
export default RightMain