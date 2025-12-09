import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {orderableDocumentListDeskItem} from "@sanity/orderable-document-list";
import {FolderIcon} from "@sanity/icons";

const SETTINGS_SINGLETON_ID = "SETTING_SINGLETON"
const SETTING_SCHEMA_TYPE = "settings"

const LANDING_PAGE_SINGLETON_ID = "LANDING_SINGLETON"
const LANDING_SCHEMA_TYPE = "landing_page"

const WORKS_SCHEMA_TYPE = "works";

const singletons = [SETTINGS_SINGLETON_ID, LANDING_PAGE_SINGLETON_ID];
const singletonSchemaTypes = [SETTING_SCHEMA_TYPE, LANDING_SCHEMA_TYPE];

const sortableSchemaTypes = [WORKS_SCHEMA_TYPE]

export default defineConfig({
    name: 'default',
    title: 'Eva Portfolio',

    projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',

    plugins: [
        structureTool({
            structure: async (S, context) => {

                return S.list()
                    .title('Portfolio Einstellungen')
                    .items([
                        S.listItem()
                            .title('Globale Einstellungen')
                            .id(SETTING_SCHEMA_TYPE)
                            .child(
                                S.document()
                                    .schemaType(SETTING_SCHEMA_TYPE)
                                    .documentId(SETTINGS_SINGLETON_ID)
                            ),
                        S.listItem()
                            .title('Startseite')
                            .id(LANDING_SCHEMA_TYPE)
                            .child(
                                S.document()
                                    .schemaType(LANDING_SCHEMA_TYPE)
                                    .documentId(LANDING_PAGE_SINGLETON_ID)
                            ),
                        S.divider(),
                        orderableDocumentListDeskItem({
                            type: WORKS_SCHEMA_TYPE,
                            title: 'Werke',
                            icon: FolderIcon,
                            S,
                            context,
                        }),
                        ...S.documentTypeListItems().filter(
                            item => {
                                const itemId = item.getId() ?? '';
                                return !singletonSchemaTypes.includes(itemId) && !sortableSchemaTypes.includes(itemId)
                            }
                        )
                    ]);
            }
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
    document: {
        actions: (prev, context) => {
            if (singletons.includes(context.schemaType)) {
                return prev.filter(
                    action => !['create', 'delete', 'duplicate'].includes(action.action ?? '')
                );
            }
            return prev;
        },
        newDocumentOptions: (prev) => {
            return prev
                .filter(
                    item => !singletons.includes(item.templateId)
                );
        }
    }
})

