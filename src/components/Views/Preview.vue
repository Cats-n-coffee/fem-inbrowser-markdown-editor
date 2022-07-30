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
import { parseLine, buildLists } from '../../helpers/parsing';
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
            blockType: '',
            textContent: '',
        }
    },
    computed: {
        ...mapState(['isOnlyPreview', 'documentMdInView']),
    },
    methods: {
        parseMarkdown() {
            const content = this.documentMdInView.content;
            console.log('%cBEGINNING', 'color: magenta', content);

            if (!content){
                this.clearAllText();
                return;
            }
            
            // TRY: wait for white space to decide the tag, if no white space
            // print regular text

            // TODO: need an extra function to CHECK for newlines and split the 
            // content so it can be further processed as either old or new/current 
            // lines.
            // IF there is a newline in the content string, we know there is old
            // content, and we have to treat it as such. 
            // Anything AFTER the LAST newline will be treated as the current line

            // if there are new lines, we can parse without the "on the fly" parsing
            // this is for existing text that we need to print to the screen
            let currentLastLine;
            if (content.includes('\n')) {
                const oldLines = content.split('\n');
                console.log('whole array', oldLines);
                // If newline is the last character, we assume only parsing old lines
                if (content.lastIndexOf('\n') === content.length - 1) {
                    this.previousLines = oldLines;
                    this.currentLine = '';
                } else { // If newline isn't last, the assume the user is typing
                    this.previousLines = oldLines.slice(0, oldLines.length - 1);
                    console.log('previous', this.previousLines);

                    this.currentLine = oldLines[oldLines.length - 1];
                    console.log('current LINE', this.currentLine);
                } 
                let parsedPreviousLines = this.previousLines.map(line => {
                    const lineToRender = parseLine(line);
                    return lineToRender;
                }).filter(item => item);
                console.log('parsed prev lines', parsedPreviousLines);
                currentLastLine = parseLine(this.currentLine);
                this.resultArr = parsedPreviousLines;

                buildLists(this.resultArr, content);

                if (this.currentLine) {
                    this.resultArr.push(currentLastLine);
                }
                
                this.result = this.resultArr.join('');
            } else {
                this.currentLine = content;
                currentLastLine = parseLine(this.currentLine);
                this.result = currentLastLine;
                console.log('%c no prev lines', 'color: orange', this.result);
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
    padding: 22px;
}

.preview-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-width: 672px;

    ::v-deep {
        h1 {
            font-family: $font-slab;
            color: var(--content-preview-title);
            font-weight: 700;
            font-size: 32px;
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