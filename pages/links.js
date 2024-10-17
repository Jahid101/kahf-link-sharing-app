import CardContent from '@/components/customUI/CardContent';
import PageTitle from '@/components/customUI/PageTitle';
import VerticalDndWithLinkForm from '@/components/dnd/VerticalDndWithLinkForm';
import Layout from '@/components/layout/Layout';


const LinkPage = () => {

    return (
        <Layout>
            <div className="w-full lg:w-[60%]">
                <CardContent className="mb-7 py-7">
                    <PageTitle title="Customize your links" className="mb-2" />
                    <p className='text-sm'>Add/edit/remove links below and then share all your profiles with the world!</p>

                    {/* Dnd with form */}
                    <VerticalDndWithLinkForm />
                </CardContent>
            </div>
        </Layout >
    );
};

export default LinkPage;
