import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'LikeVoteWebPartStrings';
import LikeVote from './components/LikeVote';
import { ILikeVoteProps } from './components/ILikeVoteProps';
import { sp } from '@pnp/sp/presets/all';

export interface ILikeVoteWebPartProps {
  description: string;
  likedefault: boolean;
}

export default class LikeVoteWebPart extends BaseClientSideWebPart<ILikeVoteWebPartProps> {

  private pageTitle: string = "";

  protected async onInit(): Promise<void> {
    const _ = await super.onInit();
    sp.setup({
      spfxContext: this.context
    });

    this.pageTitle = this.context.pageContext.site.serverRequestPath;

  }
  public render(): void {
    const element: React.ReactElement<ILikeVoteProps> = React.createElement(
      LikeVote,
      {
        description: this.properties.description,
        likedefault: this.properties.likedefault,
        currentPageTitle: this.pageTitle,
        user: this.context.pageContext.user.email
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneToggle('likedefault', { label: "Like button default" })
              ]
            }
          ]
        }
      ]
    };
  }
}
