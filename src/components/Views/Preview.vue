<template>
    <div class="preview-wrapper">
        <div class="document-header">
            <h2>Preview</h2>
            <ToggleView />
        </div>
        <div class="file-content">
          <div
            class="preview-content"
            v-html="result"
          />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { loopForLists, parseLine } from '../../helpers/parsing';
import ToggleView from './ToggleView.vue';

export default {
    name: 'Preview',
    components: {
        ToggleView,
    },
    data() {
        return {
            result: '',
            resultArr: [],
            currentLine: '',
            previousLines: [],
            htmlTag: '',
        }
    },
    computed: {
        ...mapState(['isOnlyPreview', 'documentMdInView']),
    },
    methods: {
        parseMarkdown() {
            const content = this.documentMdInView.content;

            if (!content){
                this.clearAllText();
                return;
            }
            // IF there is a newline in the content string, we know there is old
            // content, and we have to treat it as such. 
            // Anything AFTER the LAST newline will be treated as the current line

            // if there are new lines, we can parse without the "on the fly" parsing
            // this is for existing text that we need to print to the screen
            let currentLastLine;
            if (content.includes('\n')) {
                const oldLines = content.split('\n');

                // If newline is the last character, we assume only parsing old lines
                if (content.lastIndexOf('\n') === content.length - 1) {
                    this.previousLines = oldLines;
                    this.currentLine = '';
                } else { // If newline isn't last, then assume the user is typing
                    this.previousLines = oldLines.slice(0, oldLines.length - 1);
                    this.currentLine = oldLines[oldLines.length - 1];
                } 
                let parsedPreviousLines = this.previousLines.map(line => {
                    const lineToRender = parseLine(line);
                    return lineToRender;
                }).filter(item => item);
                currentLastLine = parseLine(this.currentLine);
                this.resultArr = parsedPreviousLines;

                this.resultArr = loopForLists(this.resultArr);

                if (this.currentLine) {
                    this.resultArr.push(currentLastLine);
                }
                
                this.result = this.resultArr.join('');
            } else { // handles the content as only one line (current line)
                this.currentLine = content;
                currentLastLine = parseLine(this.currentLine);
                this.result = currentLastLine;
            }
            
            return this.htmlTag;
        },
        clearAllText() {
            this.result = "";
        },
    },
    watch: {
        documentMdInView: {
            immediate: true,
            handler() {
                this.parseMarkdown();
            },
            deep: true,
        }
    },
}
</script>

<style lang="scss" scoped>
.preview-wrapper {
    flex-grow: 1;
    flex-basis: 0;
}

.document-header {
    display: flex;
    justify-content: space-between;
}

.file-content {
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    padding: 0 22px 22px 22px;
}

.preview-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-width: 672px;

    ::v-deep {
        h1, h2, h3, h4, h5, h6, p, ul, ol, a, blockquote {
            padding: 4px 0;
        }
        h1 {
            font-family: $font-slab;
            color: var(--content-preview-title);
            font-weight: 700;
            font-size: 32px;
            padding: 2px 0 5px 0;
        }

        h2 {
            font-family: $font-slab;
            color: var(--content-preview-title);
            font-weight: 300;
            font-size: 28px;
        }

        h3 {
            font-family: $font-slab;
            color: var(--content-preview-title);
            font-weight: 700;
            font-size: 24px;
        }

        h4 {
            font-family: $font-slab;
            color: var(--content-preview-title);
            font-weight: 700;
            font-size: 20px;
        }

        h5 {
            font-family: $font-slab;
            color: var(--content-preview-title);
            font-weight: 700;
            font-size: 16px;
        }

        h6 {
            font-family: $font-slab;
            color: var(--orange);
            font-weight: 700;
            font-size: 14px;
        }

        p {
            color: var(--content-preview-text);
            font-family: $font-slab;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
        }

        li {
            padding-left: 30px;
            font-family: $font-slab;
            color: var(--content-preview-text);
            font-weight: 400;
            font-size: 14px;
        }

        ul {
            list-style: none;
        }

        ul li::before {
            content: "\2022";
            color: red;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }

        ol {
            list-style-position: inside;
        }

        a {
            color: var(--content-preview-text);
            font-weight: 700;
            font-family: $font-slab;
        }

        blockquote {
            display: block;
            padding: 24px;
            width: 100%;
            background-color: var(--content-blocks-bg);
            color: var(--content-blocks-text);
            font-family: $font-slab;
            font-weight: 700;
            border-left: 4px solid var(--orange);
            border-radius: 4px;
        }
    }
}
</style>