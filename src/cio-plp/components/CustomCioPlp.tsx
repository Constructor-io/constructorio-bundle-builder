import CioPlp, {
  type CioPlpProps,
  type IncludeRenderProps,
  type PlpContextValue,
} from "@constructor-io/constructorio-ui-plp";
import "@constructor-io/constructorio-ui-plp/styles.css";

/*
 * ============================================================================
 * PLP CUSTOMIZATION TEMPLATE
 * ============================================================================
 *
 * This is your main customization file for the Constructor.io PLP component.
 *
 * GETTING STARTED:
 * 1. Edit this file "CustomCioPlp.tsx" to add your customizations
 * 3. Build the bundle: npm run build:bundle
 * 4. Use dist/custom-cio-plp.iife.js in your application
 */

/*
 * ============================================================================
 * CUSTOM COMPONENTS (Optional)
 * ============================================================================
 *
 * Available component overrides for CioPlp:
 * - ProductCard: Custom product card component
 * - Pagination: Custom pagination component
 * - Sort: Custom sort component
 * - Filters: Custom filters component
 * - ZeroResults: Custom zero results component
 * - Spinner: Custom loading spinner
 * - Groups: Custom groups/categories component
 * - Breadcrumbs: Custom breadcrumbs component
 */

/*
 * ============================================================================
 * CUSTOM CIO PLP COMPONENT
 * ============================================================================
 *
 * OPTION 1: Simple usage with props
 * Use this for basic customization via props
 *
 * <CioPlp {...props} />
 *
 * -----------------------------------------
 *
 * * OPTION 2: Advanced usage with CioPlpGrid render prop
 * Use this for full control over the grid layout and components
 * Uncomment below and comment out OPTION 1 above to use:
 *
 * <CioPlp apiKey={API_KEY}>
 *   <CioPlpGrid>
 *     {(props) => <CustomCioPlpGrid {...props} />}
 *   </CioPlpGrid>
 * </CioPlp>
 *
 */

function CustomCioPlp(props: IncludeRenderProps<CioPlpProps, PlpContextValue>) {
  return <CioPlp {...props} />;
}

export default CustomCioPlp;
